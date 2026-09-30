"use server"; import { revalidatePath } from "next/cache"; import { duplicateProject } from "@/server/repositories/duplicate-project";
export async function duplicateProjectAction(id:string){await duplicateProject(id);revalidatePath("/proyectos");}
