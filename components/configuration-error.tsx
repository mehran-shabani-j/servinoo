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
          <strong>راه حل:</strong> به بخش <strong>Settings &gt; Integrations</strong> در پروژه Vercel خود بروید و مطمئن
          شوید که Supabase به درستی متصل شده است. گاهی اوقات قطع و وصل مجدد اتصال، مشکل را حل می‌کند.
        </p>
      </AlertDescription>
    </Alert>
  )
}
