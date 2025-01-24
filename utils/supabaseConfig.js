import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qurridsqflqlsyzcftye.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cnJpZHNxZmxxbHN5emNmdHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3Mzg1NzEsImV4cCI6MjA1MzMxNDU3MX0.ArG_HTYPUqHFOTVhPEw83MBR8tmRST_FY2dL7Y63H6g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);