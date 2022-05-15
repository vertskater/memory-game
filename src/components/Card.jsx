export default function Card({ cardData }) {
  return (
    <>
      <h3>{cardData.name}</h3>
      <div>
        <img
          alt={cardData.name}
          src={process.env.PUBLIC_URL + "/" + cardData.img}
          width={300}
        />
      </div>
    </>
  );
}
