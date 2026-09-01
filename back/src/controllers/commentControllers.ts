import type {Request, Response} from "express"

import * as queries from "../db/query"
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
    try {
        const {userId}  = getAuth(req)
        if(!userId) return res.status(401).json({error: "unauthorized"})
        const {productId} = req.params as { productId: string }
        const {content} = req.body

        if(!content) return res.status(400).json({error: "Comment content is required"})

        const product = await queries.getProductById(productId)
        if(!product) return res.status(404).json({error: "Product not found"})
            
        const comment = await queries.createComment({
            content,
            userId,
            productId,
        })

        res.status(201).json(comment)
    } catch (error) {
        console.error("Error creating content:", error)
        res.status(500).json({error: "Failed to comment"})
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const {userId}  = getAuth(req)
        if(!userId) return res.status(401).json({error: "unauthorized"})
        
            const {commentId} = req.params as { commentId: string }


        const comment = await queries.getCommentsById(commentId)
        if(!comment) return res.status(404).json({error: "Comment not found"})

            if(comment.userId !== userId) return res.status(403).json({error: "Forbidden: You can only delete your own comments"})
            
        const deletedComment = await queries.deleteComment(commentId)

        res.status(201).json(deletedComment)
    } catch (error) {
        console.error("Error deleting comment:", error)
        res.status(500).json({error: "Failed to delete comment"})
    }
}