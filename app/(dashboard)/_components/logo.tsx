import Image from "next/image";

const Logo = ({ className, size }: { className?: string; size?: number }) => {
  return (
    <div className={className}>
      <Image
        height={size || 130}
        width={size || 130}
        alt="logo"
        src="/team-labs.png"
      />
    </div>
  );
};

export default Logo;
