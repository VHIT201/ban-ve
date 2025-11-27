import { z } from 'zod'

// Helper function để lấy ZodObject từ ZodEffects
export const getSchemaShape = (schema: z.ZodTypeAny): z.ZodRawShape => {
  if (schema instanceof z.ZodObject) {
    return schema.shape
  } else if (schema instanceof z.ZodEffects) {
    return getSchemaShape(schema._def.schema)
  }
  throw new Error('Unsupported schema type')
}

// Helper function để lấy default values từ bất kỳ Zod schema type nào
export const getDefaultValuesFromSchema = (schema: z.ZodTypeAny): Record<string, unknown> => {
  const shape = getSchemaShape(schema)
  const defaults: Record<string, unknown> = {}

  Object.keys(shape).forEach((key) => {
    const field = shape[key]

    if (field instanceof z.ZodString) {
      defaults[key] = ''
    } else if (field instanceof z.ZodNumber) {
      defaults[key] = 0
    } else if (field instanceof z.ZodBoolean) {
      defaults[key] = false
    } else if (field instanceof z.ZodArray) {
      defaults[key] = []
    } else if (field instanceof z.ZodOptional || field instanceof z.ZodNullable) {
      defaults[key] = undefined
    } else if (field instanceof z.ZodDefault) {
      defaults[key] = field._def.defaultValue()
    } else if (field instanceof z.ZodEffects) {
      defaults[key] = getDefaultValuesFromSchema(field)
    } else {
      defaults[key] = null
    }
  })

  return defaults
}

// Helper function để unwrap ZodEffects (refine)
export const unwrapSchema = (schema: z.ZodTypeAny): z.ZodTypeAny => {
  if (schema instanceof z.ZodEffects) {
    // dùng unknown type param để tránh `any`
    const inner = (schema as z.ZodEffects<z.ZodTypeAny, unknown>)._def.schema
    return unwrapSchema(inner)
  }
  return schema
}
