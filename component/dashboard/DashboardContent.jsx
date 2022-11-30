export default function DashboardContent({children, style}) {
  return (
    <div className={"main-layout "+style}>
      <div className="page-content">
        <div className="container-fluid ">
          {children}
        </div>
      </div>
    </div>
  )
}