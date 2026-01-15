-- Create storage bucket for design images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('design-images', 'design-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to design images
CREATE POLICY "Anyone can view design images"
ON storage.objects FOR SELECT
USING (bucket_id = 'design-images');

-- Allow admins to upload design images
CREATE POLICY "Admins can upload design images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'design-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update design images
CREATE POLICY "Admins can update design images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'design-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete design images
CREATE POLICY "Admins can delete design images"
ON storage.objects FOR DELETE
USING (bucket_id = 'design-images' AND public.has_role(auth.uid(), 'admin'));