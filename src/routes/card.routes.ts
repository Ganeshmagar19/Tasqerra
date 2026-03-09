import { Router } from "express";
import { CardController } from "../controllers/card.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// create card in list
router.post("/lists/:listId/cards", authenticate, CardController.createCard);

// get cards of list
router.get("/lists/:listId/cards", authenticate, CardController.getCards);

// update card
router.patch("/cards/:id", authenticate, CardController.updateCard);

// delete card
router.delete("/cards/:id", authenticate, CardController.deleteCard);

// move card
router.patch("/cards/:id/move", authenticate, CardController.moveCard);

// assign card
router.patch("/cards/:id/assign", authenticate, CardController.assignCard);

export default router;
