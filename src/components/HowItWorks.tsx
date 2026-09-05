import "./HowItWorks.css";

const steps = [
  ["01", "pick", "Choose your favorite thing"],
  ["02", "drag", "Pick a sticker from the drawer"],
  ["03", "stick", "Drop it on your object"],
  ["04", "move, rotate, resize", "Make it just right"],
  ["05", "repeat", "And bedazzle to your heart's content ✨"],
] as const;

export function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-heading">
        <span>how it works</span>
        <span>♥</span>
      </div>
      <div className="step-list">
        {steps.map(([number, title, description]) => (
          <div className="step" key={number}>
            <span className="step__number">{number}</span>
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
