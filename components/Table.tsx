import { Payment, toolColumns, categoryColumns } from "./Columns"
import { DataTable } from "./data-table"


export default  function DemoPage(props) {

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={props.isCategory == true ? categoryColumns : toolColumns} data={props.data} /> */}
    </div>
  )
}
