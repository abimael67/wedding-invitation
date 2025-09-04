const Envelope = ({
  setEnvelopeOpened,
}: {
  setEnvelopeOpened: (opened: boolean) => void;
}) => {
  return (
    <div className="relative">
      <button onClick={() => setEnvelopeOpened(true)}>Abrir</button>
    </div>
  );
};

export default Envelope;
