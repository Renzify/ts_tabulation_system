import { Request, Response } from "express";
import * as createQuery from "../db/queries/create.queries.ts";
import * as readQuery from "../db/queries/select.queries.ts";
import * as updateQuery from "../db/queries/update.queries.ts";
import * as deleteQuery from "../db/queries/delete.queries.ts";
import * as idReadQuery from "../db/queries/id-select.queries.ts";

// select all event
export async function getAllEvent(req: Request, res: Response) {
  try {
    const events = await readQuery.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("getAllEvent controller error:", error);
    res.status(500).json({ message: "Failed getting all event" });
  }
}

// select event by id
export async function getEventById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const event = await idReadQuery.getEventById(id);

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
    const { inputEventName, inputEventDesc } = req.body;

    const createdEvent = await createQuery.createEvent({
      eventName: inputEventName,
      eventDesc: inputEventDesc,
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
    const id = req.params.id as string;
    const { inputEventName, inputEventDesc } = req.body;

    const existingEvent = await idReadQuery.getEventById(id);

    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" }); // if event does not exist
      return;
    }

    const updatedEvent = await updateQuery.updateEvent(id, {
      eventName: inputEventName,
      eventDesc: inputEventDesc,
    });

    res.status(200).json(updateEvent);
  } catch (error) {
    console.error("updateEvent controller error:", error);
    res.status(500).json({ message: "Failed updating event" });
  }
}

// delete event
export async function deleteEvent(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const existingEvent = await idReadQuery.getEventById(id);

    if (!existingEvent) {
      res.status(404).json({ message: "Event not found" }); // if event does not exist
      return;
    }

    await deleteQuery.deleteEvent(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("deleteEvent controller error:", error);
    res.status(500).json({ message: "Failed deleting event" });
  }
}
