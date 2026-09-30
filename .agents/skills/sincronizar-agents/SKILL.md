---
name: sincronizar-agents
description: Sincroniza AGENTS.md con el estado real del repositorio. Usar solo cuando el usuario invoque explícitamente $sincronizar-agents.
---

# Sincronizar AGENTS.md

Mantén `AGENTS.md` alineado con el proyecto mediante cambios mínimos.

## Revisión

1. Lee `.specify/memory/constitution.md` como autoridad, sin copiar su contenido.
2. Revisa `git status` y el diff completo contra `HEAD`, incluidos cambios staged y unstaged. Busca
   el último commit que modificó `AGENTS.md` e inspecciona los commits posteriores. Si Git, `HEAD` o
   ese commit no existen, trabaja con la evidencia disponible e informa la limitación.
3. Compara `AGENTS.md` con el estado actual de:
   - carpetas existentes bajo `/app`;
   - scripts presentes en `package.json`;
   - convenciones efectivamente adoptadas;
   - fase en curso y sus artefactos bajo `specs/`.
4. Identifica únicamente información ausente o desactualizada. Si la fase en curso no puede
   determinarse sin asumir, pregunta antes de editar.

## Actualización

- Modifica solo `AGENTS.md`; no toques código ni `.specify/memory/constitution.md`.
- Conserva todo lo vigente y aplica el parche más pequeño posible.
- Mantén `AGENTS.md` en unas 60 líneas como máximo; resume antes de agregar extensión.
- No repitas la constitución: enlázala o referencia sus principios.
- No inventes comandos, carpetas, convenciones ni fases.
- No elimines reglas de `Cómo trabajar` sin confirmación explícita del usuario.
- No agregues funcionalidad ni conviertas esta revisión en una auditoría general.

Si no hay nada que actualizar, no escribas el archivo. Al finalizar, informa en pocas líneas qué
secciones cambiaron y por qué, o confirma que `AGENTS.md` ya estaba sincronizado.
