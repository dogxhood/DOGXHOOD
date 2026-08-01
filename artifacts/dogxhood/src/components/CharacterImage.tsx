export function CharacterImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/assets/dogxhood-character.jpg" 
        alt="DOGXHOOD" 
        className="w-full h-full object-cover rounded-xl border-2 border-primary box-shadow-lime"
      />
    </div>
  );
}
