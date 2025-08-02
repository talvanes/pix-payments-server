import * as migration001 from '@/db/migrations/001_create_users_table.js'
import * as migration002 from '@/db/migrations/002_create_pix_charges_table.js'
import * as migration003 from '@/db/migrations/003_create_indexes.js'

export const migrations = [
    { id: '001', ...migration001 },
    { id: '002', ...migration002 },
    { id: '003', ...migration003 },
]
