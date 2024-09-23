import { Markets } from "../components/market";

export default function Page() {
    return  <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h3 className="flex-col items-start text-3xl">MARKETS</h3>
    <Markets />
  </main>
}