import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users=pgTable("users", {
    id:text("id").primaryKey(),
    email:text("email").notNull().unique(),
    name:text("name"),
    imageUrl:text("image_url"),
    createdAt:timestamp("created_at", { mode: "date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at", { mode: "date"}).notNull().$onUpdate(()=> new Date())
})

export const products=pgTable("products", {
    id:uuid("id").defaultRandom().primaryKey(),
    title:text("title").notNull(),
    description:text("name").notNull(),
    imageUrl:text("image_url").notNull(),
    userId:text("user_id")
        .notNull()
        .references(()=>users.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at", { mode: "date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at", { mode: "date"}).notNull().$onUpdate(()=> new Date())
})

export const comments=pgTable("comments", {
    id:uuid("id").defaultRandom().primaryKey(),
    content:text("content").notNull(),
    userId:text("user_id")
        .notNull()
        .references(()=>users.id,{onDelete:"cascade"}),
    productId:uuid("product_id")
        .notNull()
        .references(()=>products.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at", { mode: "date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at", { mode: "date"}).notNull().$onUpdate(()=> new Date())
})

export const usersRelations = relations(users, ({many})=>({
    product: many(products),
    comment: many(comments)
}))

export const productsRelations = relations(products, ({many, one})=>({
    user: one(users, {fields: [products.userId], references: [users.id]}),
    comment: many(comments)
}))

export const commentsRelations = relations(comments, ({one})=>({
    product: one(products, {fields:[comments.userId], references:[products.userId]}),
    user: one(users, {fields:[comments.userId], references:[users.id]})
}))

//type inference vannu ko matlab if hamile index.ts ma user.User liyem vane tyo user ko type aba User hunxa matlab user{id, email, name, imageUrl, createdAt, updatedAt}
export const User=typeof users.$inferSelect
export const newUser=typeof users.$inferInsert

export const Product=typeof products.$inferSelect
export const newProduct=typeof products.$inferInsert

export const Comment=typeof comments.$inferSelect
export const newComment=typeof comments.$inferInsert
