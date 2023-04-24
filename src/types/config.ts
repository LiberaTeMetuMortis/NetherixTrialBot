// Export default a type
/*
general:
  ticket-category: "tickets" # Category name
  staff-role: "768580198655590472" # Role ID
create-ticket-message:
  embed:
    title: "Ticket"
    description: "Click here to create a ticket"
    color: "3776ed" # Hex without "#"
  button: "Create Ticket"        "max-tickets": number
ticket-created:
  title: "Ticket Created"
  description: "Your ticket has been created!"
  color: "3776ed" # Hex without "#"
 */
type Config = {
    "general": {
        "ticket-category": string,
        "staff-role": string,
        "max-tickets": number,
        "ticket-format": string
        "ping-staffs": boolean
    }
    "create-ticket-message": {
        embed: Embed
        button: string
    }
    "ticket-created": Embed
    "ticket-limit": Embed
    "ticket-first-message": Embed
    "not-ticket-channel": Embed
    "not-staff": Embed
    "already-added": Embed
    "user-added": Embed
    "not-added": Embed
    "user-removed": Embed
}
export type Embed = {
    title: string,
    description: string,
    color: string
}
export default Config
