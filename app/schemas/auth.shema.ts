import { z } from 'zod'

/**
 * Esquema de validación para el login
 */
export const loginSchema = z.object({
  email: z
    .string().nonempty({ message: 'El correo es requerido' })
    .email({ message: 'Ingresa un correo válido' }),

  password: z
    .string().nonempty({ message: 'La contraseña es requerida' })
    .min(8, { message: 'Debe tener al menos 8 caracteres' }),

  rememberMe: z.boolean().optional().default(false)
})

/**
 * Esquema de registro (por si lo usas en otra vista)
 */
export const registerSchema = z.object({
  firstName: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'El apellido es requerido'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  phone: z.string().optional(),
  apartment: z.string().optional(),
  building: z.string().optional(),
  role: z.enum(['admin', 'resident', 'guard', 'maintenance', 'visitor']).optional()
})

/**
 * Tipos derivados automáticamente de Zod
 */
export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
