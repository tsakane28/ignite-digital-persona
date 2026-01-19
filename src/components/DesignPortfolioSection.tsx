import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Upload, Image as ImageIcon } from 'lucide-react';
import { LazyImage } from '@/components/LazyImage';
import { Card3D } from '@/components/Card3D';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Import design images for fallback/mapping
import crownUmbrella from '@/assets/designs/crown-umbrella.jpg';
import crownTshirt from '@/assets/designs/crown-tshirt.jpg';
import crownCap from '@/assets/designs/crown-cap.jpg';
import crownWall from '@/assets/designs/crown-wall.jpg';
import maygoldTshirt from '@/assets/designs/maygold-tshirt.jpg';
import maygoldCap from '@/assets/designs/maygold-cap.jpg';
import maygoldWall from '@/assets/designs/maygold-wall.jpg';
import karirikiMealie from '@/assets/designs/karirikiki-mealie.jpg';
import karirikiCreep from '@/assets/designs/karirikiki-creep.jpg';
import karirikiGoat from '@/assets/designs/karirikiki-goat.jpg';

// Image mapping for local assets
const imageMap: Record<string, string> = {
  '/src/assets/designs/crown-umbrella.jpg': crownUmbrella,
  '/src/assets/designs/crown-tshirt.jpg': crownTshirt,
  '/src/assets/designs/crown-cap.jpg': crownCap,
  '/src/assets/designs/crown-wall.jpg': crownWall,
  '/src/assets/designs/maygold-tshirt.jpg': maygoldTshirt,
  '/src/assets/designs/maygold-cap.jpg': maygoldCap,
  '/src/assets/designs/maygold-wall.jpg': maygoldWall,
  '/src/assets/designs/karirikiki-mealie.jpg': karirikiMealie,
  '/src/assets/designs/karirikiki-creep.jpg': karirikiCreep,
  '/src/assets/designs/karirikiki-goat.jpg': karirikiGoat,
};

interface DesignWork {
  id: string;
  title: string;
  category: string;
  image: string;
  height: 'tall' | 'medium' | 'short';
}

const defaultCategories = ["Branding", "Merchandise", "Packaging", "Illustration"];

const heightClasses = {
  tall: 'h-80 sm:h-96',
  medium: 'h-64 sm:h-72',
  short: 'h-48 sm:h-56'
};

const getImageSrc = (imagePath: string) => {
  return imageMap[imagePath] || imagePath;
};

export const DesignPortfolioSection = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<DesignWork | null>(null);
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isManageMode, setIsManageMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<DesignWork | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [newDesign, setNewDesign] = useState({
    title: '',
    category: 'Branding',
    height: 'medium' as 'tall' | 'medium' | 'short',
    imageUrl: ''
  });
  
  // Get unique categories from existing designs + defaults
  const existingCategories = [...new Set([...defaultCategories, ...designWorks.map(d => d.category)])];
  const categories = ["All", ...existingCategories];

  // Fetch designs from database
  useEffect(() => {
    const fetchDesigns = async () => {
      const { data, error } = await supabase
        .from('design_works')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching designs:', error);
        toast({
          title: "Error",
          description: "Failed to load designs",
          variant: "destructive"
        });
      } else {
        setDesignWorks(data.map(d => ({
          id: d.id,
          title: d.title,
          category: d.category,
          image: d.image,
          height: d.height as 'tall' | 'medium' | 'short'
        })));
      }
      setIsLoading(false);
    };

    fetchDesigns();
  }, [toast]);

  const filteredWorks = activeCategory === "All" 
    ? designWorks 
    : designWorks.filter(work => work.category === activeCategory);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('design-images')
      .upload(fileName, file);
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('design-images')
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  const handleAddDesign = async () => {
    const finalCategory = useCustomCategory ? customCategory : newDesign.category;
    
    if (!newDesign.title || (!imageFile && !newDesign.imageUrl)) {
      toast({
        title: "Missing information",
        description: "Please provide a title and an image",
        variant: "destructive"
      });
      return;
    }

    if (!finalCategory) {
      toast({
        title: "Missing category",
        description: "Please select or enter a category",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    let imageUrl = newDesign.imageUrl;
    
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        toast({
          title: "Upload failed",
          description: "Failed to upload image",
          variant: "destructive"
        });
        setIsUploading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const { data, error } = await supabase
      .from('design_works')
      .insert({
        title: newDesign.title,
        category: finalCategory,
        image: imageUrl,
        height: newDesign.height
      })
      .select()
      .single();

    setIsUploading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add design",
        variant: "destructive"
      });
    } else {
      setDesignWorks([{
        id: data.id,
        title: data.title,
        category: data.category,
        image: data.image,
        height: data.height as 'tall' | 'medium' | 'short'
      }, ...designWorks]);
      setNewDesign({ title: '', category: 'Branding', height: 'medium', imageUrl: '' });
      setImageFile(null);
      setImagePreview('');
      setCustomCategory('');
      setUseCustomCategory(false);
      setIsAddDialogOpen(false);
      toast({
        title: "Success",
        description: "Design added successfully"
      });
    }
  };

  const handleDeleteDesign = async (id: string) => {
    const { error } = await supabase
      .from('design_works')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete design",
        variant: "destructive"
      });
    } else {
      setDesignWorks(designWorks.filter(work => work.id !== id));
      toast({
        title: "Success",
        description: "Design deleted successfully"
      });
    }
  };

  const handleUpdateDesign = async () => {
    if (editingDesign) {
      const { error } = await supabase
        .from('design_works')
        .update({
          title: editingDesign.title,
          category: editingDesign.category,
          height: editingDesign.height,
          image: editingDesign.image
        })
        .eq('id', editingDesign.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update design",
          variant: "destructive"
        });
      } else {
        setDesignWorks(designWorks.map(work => 
          work.id === editingDesign.id ? editingDesign : work
        ));
        setEditingDesign(null);
        setIsEditDialogOpen(false);
        toast({
          title: "Success",
          description: "Design updated successfully"
        });
      }
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for background decorative elements
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={sectionRef} id="design" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Parallax background decoration */}
      <motion.div 
        className="absolute top-10 -left-20 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />
      <motion.div 
        className="absolute bottom-10 -right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Design <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
            A showcase of my graphic design work including branding, merchandise mockups, and packaging designs for various clients.
          </p>
          
          {/* Management Toggle - Only visible to admins */}
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsManageMode(!isManageMode)}
              className="mb-4"
            >
              {isManageMode ? 'Done Managing' : 'Manage Gallery'}
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background/50 text-foreground/70 hover:bg-background hover:text-foreground border border-border/50"
              )}
            >
              {category}
            </button>
          ))}
          
          {/* Add New Design Button */}
          {isManageMode && (
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) {
                setImageFile(null);
                setImagePreview('');
                setCustomCategory('');
                setUseCustomCategory(false);
              }
            }}>
              <DialogTrigger asChild>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Design
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Design</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newDesign.title}
                      onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                      placeholder="Design title"
                    />
                  </div>
                  
                  {/* Category Selection */}
                  <div>
                    <Label>Category</Label>
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        type="button"
                        variant={!useCustomCategory ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseCustomCategory(false)}
                      >
                        Existing
                      </Button>
                      <Button
                        type="button"
                        variant={useCustomCategory ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseCustomCategory(true)}
                      >
                        New Category
                      </Button>
                    </div>
                    {!useCustomCategory ? (
                      <Select
                        value={newDesign.category}
                        onValueChange={(value) => setNewDesign({ ...newDesign, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {existingCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter new category name"
                      />
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="height">Card Size</Label>
                    <Select
                      value={newDesign.height}
                      onValueChange={(value: 'tall' | 'medium' | 'short') => setNewDesign({ ...newDesign, height: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tall">Tall</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <Label>Image</Label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {imagePreview ? (
                      <div className="relative mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                        <p className="text-xs text-muted-foreground mt-1">or paste URL below</p>
                      </div>
                    )}
                    
                    {!imageFile && (
                      <div className="mt-2">
                        <Input
                          value={newDesign.imageUrl}
                          onChange={(e) => setNewDesign({ ...newDesign, imageUrl: e.target.value })}
                          placeholder="Or paste image URL here..."
                        />
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleAddDesign} 
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Add Design'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 text-foreground/50">
            Loading designs...
          </div>
        )}

        {/* Masonry Gallery Grid */}
        {!isLoading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredWorks.map((work, index) => (
              <Card3D 
                key={work.id}
                className="break-inside-avoid mb-4"
                depth={6}
                glareEnabled={!isManageMode}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  onClick={() => !isManageMode && setSelectedImage(work)}
                >
                  <div className={cn("overflow-hidden", heightClasses[work.height])}>
                    <LazyImage
                      src={getImageSrc(work.image)}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      containerClassName="h-full"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 flex flex-col justify-end p-6",
                    isManageMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    <span className="text-primary text-sm font-medium mb-1">{work.category}</span>
                    <h3 className="text-white text-lg font-semibold">{work.title}</h3>
                    
                    {/* Management Controls */}
                    {isManageMode && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingDesign(work);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDesign(work.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Glassmorphism Border Effect */}
                  <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
                </motion.div>
              </Card3D>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredWorks.length === 0 && (
          <div className="text-center py-12 text-foreground/50">
            No designs found in this category.
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Design</DialogTitle>
            </DialogHeader>
            {editingDesign && (
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingDesign.title}
                    onChange={(e) => setEditingDesign({ ...editingDesign, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={existingCategories.includes(editingDesign.category) ? editingDesign.category : '__custom__'}
                    onValueChange={(value) => {
                      if (value !== '__custom__') {
                        setEditingDesign({ ...editingDesign, category: value });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {existingCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                      <SelectItem value="__custom__">+ New Category</SelectItem>
                    </SelectContent>
                  </Select>
                  {!existingCategories.includes(editingDesign.category) && (
                    <Input
                      className="mt-2"
                      value={editingDesign.category}
                      onChange={(e) => setEditingDesign({ ...editingDesign, category: e.target.value })}
                      placeholder="Enter new category name"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-height">Card Size</Label>
                  <Select
                    value={editingDesign.height}
                    onValueChange={(value: 'tall' | 'medium' | 'short') => setEditingDesign({ ...editingDesign, height: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tall">Tall</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Image</Label>
                  <div className="mt-2">
                    <img 
                      src={getImageSrc(editingDesign.image)} 
                      alt="Current" 
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  </div>
                  <Input
                    id="edit-image"
                    value={editingDesign.image}
                    onChange={(e) => setEditingDesign({ ...editingDesign, image: e.target.value })}
                    placeholder="Image URL"
                  />
                </div>
                <Button onClick={handleUpdateDesign} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div 
              className="relative max-w-4xl max-h-[90vh] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageSrc(selectedImage.image)}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <span className="text-primary text-sm font-medium">{selectedImage.category}</span>
                <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
