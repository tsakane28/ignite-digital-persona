-- Create table for design works
CREATE TABLE public.design_works (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  height TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.design_works ENABLE ROW LEVEL SECURITY;

-- Everyone can view designs (public portfolio)
CREATE POLICY "Anyone can view designs"
ON public.design_works
FOR SELECT
USING (true);

-- Only admins can insert designs
CREATE POLICY "Admins can insert designs"
ON public.design_works
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update designs
CREATE POLICY "Admins can update designs"
ON public.design_works
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete designs
CREATE POLICY "Admins can delete designs"
ON public.design_works
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_design_works_updated_at
BEFORE UPDATE ON public.design_works
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial design works
INSERT INTO public.design_works (title, category, image, height) VALUES
('Crown Mealie Meal - Cap Design', 'Branding', '/src/assets/designs/crown-cap.jpg', 'medium'),
('Crown Mealie Meal - T-Shirt', 'Branding', '/src/assets/designs/crown-tshirt.jpg', 'tall'),
('Crown Mealie Meal - Wall Art', 'Branding', '/src/assets/designs/crown-wall.jpg', 'short'),
('Crown Mealie Meal - Umbrella', 'Branding', '/src/assets/designs/crown-umbrella.jpg', 'medium'),
('Maygold Cooking Oil - Cap', 'Branding', '/src/assets/designs/maygold-cap.jpg', 'tall'),
('Maygold Cooking Oil - T-Shirt', 'Branding', '/src/assets/designs/maygold-tshirt.jpg', 'short'),
('Maygold Cooking Oil - Wall Art', 'Branding', '/src/assets/designs/maygold-wall.jpg', 'medium'),
('Karirikiki - Creep Design', 'Illustration', '/src/assets/designs/karirikiki-creep.jpg', 'tall'),
('Karirikiki - Goat Illustration', 'Illustration', '/src/assets/designs/karirikiki-goat.jpg', 'medium'),
('Karirikiki - Mealie Design', 'Illustration', '/src/assets/designs/karirikiki-mealie.jpg', 'short');