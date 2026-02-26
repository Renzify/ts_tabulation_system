import { Request, Response } from "express";
import * as queries from "../db/queries/create.queries";

// select all event
export async function getAllEvent(req: Request, res: Response) {
  try {
    const events = await queries.getAllEvent();
    res.status(200).json(events);
  } catch (error) {
    console.error("getAllEvent controller error:", error);
    res.status(500).json({ message: "Failed getting all event" });
  }
}

// select event by id
export async function getEventById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const event = await queries.getEventById(id);

    if (!event) {
      res.status(404).json({ message: "Event not found" }); // if event does not exist
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Get getEventById controller error:", error);
    res.status(500).json({ message: "Failed getting event by id" });
  }
}

// create event
export async function createEvent(req: Request, res: Response) {
  try {
    const { eventName, eventDesc } = req.body;

    const createdEvent = await queries.createEvent({
      eventName,
      eventDesc,
    });

    res.status(201).json(createdEvent);
  } catch (error) {
    console.error("createEvent controller error:", error);
    res.status(500).json({ message: "Failed creating event" });
  }
}

// update event
export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { eventName, eventDesc } = req.body;

    const existingEvent = await queries.getEventById(id);

    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" }); // if event does not exist
      return;
    }

    if (existingEvent.id !== id) {
      res.status(403).json({ message: "You can only update your own event" });
      return;
    }

    const updatedEvent = await queries.updateEvent({id, 
        {
        eventName,
        eventDesc,
        }
    });

    res.status(200).json(updateEvent);
  } catch (error) {
    console.error("updateEvent controller error:", error );
    res.status(500).json({message: "Failed updating event"});
  }
}

// delete event
export async function deleteEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { eventName, eventDesc } = req.body;

    const existingEvent = await queries.getEventById(id);

    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" }); // if event does not exist
      return;
    }

    if (existingEvent.id !== id) {
      res.status(403).json({ message: "You can only update your own event" });
      return;
    }

    await queries.deleteEvent(id);
    res.status(200).json({message: "Event deleted successfully"});


  } catch (error) {
    console.error("deleteEvent controller error:", error );
    res.status(500).json({message: "Failed deleting event"});
  }
}


