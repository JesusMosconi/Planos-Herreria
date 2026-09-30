import type { Metadata } from "next";
import { AppHeader } from "@/features/projects/AppHeader";
import "./globals.css";
export const metadata:Metadata={title:"Diseñador para herrería",description:"Planos y piezas desde un único modelo paramétrico"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><AppHeader/><main className="mx-auto max-w-6xl px-4 py-8">{children}</main></body></html>}
