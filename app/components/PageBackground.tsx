interface PageBackgroundProps {
  image: string;
  overlay?: boolean;
}

export default function PageBackground({ image, overlay = true }: PageBackgroundProps) {
  return (
    <>
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/${image})` }}
      />
      {overlay && (
        <div className="fixed inset-0 -z-10 bg-black/70" />
      )}
    </>
  );
}
