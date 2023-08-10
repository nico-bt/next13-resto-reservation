import Header from "./components/Header"

export default function loading() {
  return (
    <>
      <Header />

      <div className="flex py-4 m-auto w-2/3 justify-between items-start animate-pulse">
        {/* SIDEBAR */}
        <div className="w-1/5"></div>

        <div className="w-5/6">
          <div className="border-b flex pb-5 ml-6">
            <div className="w-44 h-36 rounded mt-1 bg-slate-300"> </div>
            <div className="pl-5">
              <div className="mb-2 w-60 bg-slate-300 text-slate-400 w-full text-center">...</div>
            </div>
          </div>

          <div className="border-b flex pb-5 ml-6">
            <div className="w-44 h-36 rounded mt-1 bg-slate-300"> </div>
            <div className="pl-5">
              <div className="mb-2 w-60 bg-slate-300 text-slate-400 w-full text-center">...</div>
            </div>
          </div>

          <div className="border-b flex pb-5 ml-6">
            <div className="w-44 h-36 rounded mt-1 bg-slate-300"> </div>
            <div className="pl-5">
              <div className="mb-2 w-60 bg-slate-300 text-slate-400 w-full text-center">...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
