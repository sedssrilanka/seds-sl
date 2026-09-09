-- SEDS Sri Lanka: Database Schema for Dynamic Runtime Data

-- 1. Moon Event Registrations
CREATE TABLE IF NOT EXISTS public.moon_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    chapter_or_university TEXT,
    event_year INTEGER DEFAULT 2025 NOT NULL,
    observation_location TEXT,
    attendee_count INTEGER DEFAULT 1,
    has_telescope BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'attended', 'cancelled')),
    notes TEXT
);

-- 2. Orders & Merchandise
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    total_amount_lkr NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'receipt_uploaded', 'paid', 'refunded')),
    payment_receipt_url TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 3. Transactions Log
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    amount_lkr NUMERIC(10, 2) NOT NULL,
    payment_method TEXT DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'payhere', 'stripe', 'cash_on_delivery')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    reference_number TEXT,
    verified_by TEXT,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- 4. Contact & Form Submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'website_contact'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.moon_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (for web forms), restricted read/update to service_role / authenticated admins
CREATE POLICY "Allow public insert to registrations" ON public.moon_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
