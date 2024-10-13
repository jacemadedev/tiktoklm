import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TikTokAccountListProps {
  accounts: { id: number; username: string }[];
}

export default function TikTokAccountList({ accounts }: TikTokAccountListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>TikTok Username</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell>{account.username}</TableCell>
            <TableCell>Monitoring</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}