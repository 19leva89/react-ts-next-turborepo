import type { PropsWithChildren } from 'react'

import { DashboardLayout } from '@/components/dashboard-layout'

const PlannerLayout = ({ children }: PropsWithChildren) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default PlannerLayout
