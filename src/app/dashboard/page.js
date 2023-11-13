import SideBar from './components/SideBar'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="container relative flex gap-2 pt-8 md:pt-12 pb-8">
        <h1 className="text-2xl font-bold">Find A Room</h1>
      </div>
      <div className="container grid grid-cols-12 gap-2">
        <SideBar />
        <div className="border col-span-8">
          Hello from Dashboard(Findroom)
          <Button variant="outline">Button</Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
