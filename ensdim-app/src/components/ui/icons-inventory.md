# Icon Inventory

This file documents the icon inventory and recommended mapping to `lucide-react` components. Use `src/components/ui/icon.tsx` as the wrapper when rendering icons.

Recommended mapping (entity → icon):

- Dashboard: `LayoutDashboard`
- Projects: `Folder`, `FolderOpen`
- Milestones: `Flag`, `FlagCheckered` (or `Milestone` if available)
- Revisions: `MessageSquare`, `RotateCcw`
- Files: `FileText`, `Paperclip`
- Payments: `CreditCard`, `Receipt`
- Invoices: `FileText`
- Notifications: `Bell`
- Settings: `Settings`
- Team: `Users`
- Clients: `UserCheck`
- Tasks: `CheckSquare`
- Roles: `ShieldCheck`
- Analytics: `BarChart3`
- Approve: `CheckCircle`
- Reject: `XCircle`
- Upload: `Upload` / `CloudUpload`
- Download: `Download`
- Delete: `Trash2`
- Edit: `Pencil`
- Add: `Plus`
- Search: `Search`
- Filter: `Filter`
- Sort: `ArrowUpDown`
- More actions: `MoreHorizontal`
- Close: `X`
- Back: `ChevronLeft`
- External link: `ExternalLink`

Notes:
- The wrapper `Icon` accepts a component via the `as` prop, for example:

```tsx
import Icon from "@/components/ui/icon";
import { Search } from "lucide-react";

<Icon as={Search} size="md" className="text-[var(--text-muted)]" />
```

- Keep this inventory updated as icons are added to the project.
