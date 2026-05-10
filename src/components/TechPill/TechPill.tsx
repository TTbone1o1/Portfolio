type TechPillProps = {
  children: string
}

function TechPill({ children }: TechPillProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#ddd5c8] bg-white/80 px-3 py-1 text-[0.78rem] font-semibold tracking-[-0.01em] text-[#5f5548] shadow-[0_8px_18px_rgba(23,20,17,0.04)]">
      {children}
    </span>
  )
}

export default TechPill
