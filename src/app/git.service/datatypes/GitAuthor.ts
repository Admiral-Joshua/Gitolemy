export class GitAuthor {
    fullName: string
    email: string
    icon: any
    iconUrl: string

    constructor(name: string, email: string, icon?: any)
    {
        if (typeof icon === "string")
        {
            this.iconUrl = icon
        } else {
            this.icon = icon
        }

        this.fullName = name
        this.email = email
    }
}