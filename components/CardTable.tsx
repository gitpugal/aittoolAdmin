import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Eye, PencilIcon } from "lucide-react";
import { Trash } from "lucide-react";

export function TableDemo(props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Slug</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data &&
          props.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.slug}</TableCell>
              <TableCell className="text-right">{item.created_at}</TableCell>
              <TableCell>
                <PencilIcon color="gray"/>
              </TableCell>
              <TableCell>
                <Trash color="red"/>
              </TableCell>
              <TableCell>
                <Eye color="gray"/>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
