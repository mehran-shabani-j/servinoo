import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function ConfigurationError({ error }: { error: string }) {
  return (
    <Alert variant="destructive" className="my-8 max-w-2xl mx-auto">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>خطای پیکربندی</AlertTitle>
      <AlertDescription>
        <p>اتصال به دیتابیس برقرار نشد. لطفاً از صحت تنظیمات پروژه خود در Vercel اطمینان حاصل کنید.</p>
        <p className="mt-2 text-xs font-mono bg-red-100 dark:bg-red-900 p-2 rounded text-right" dir="ltr">
          <strong>Error Message:</strong> {error}
        </p>
        <p className="mt-2">
          <strong>راه حل:</strong> به بخش <strong>Settings &gt; Environment Variables</strong> در پروژه Vercel خود بروید
          و متغیرهای زیر را تنظیم کنید:
        </p>
        <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto text-xs">
          NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co{"\n"}
          NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
        </pre>
        <p className="mt-2">
          این مقادیر را می‌توانید از پنل Supabase خود در بخش <strong>Settings &gt; API</strong> پیدا کنید.
        </p>
      </AlertDescription>
    </Alert>
  )
}
