export default function Card({ title, subtitle, image, stats = [], children, onClick, highlight = false }) {
  const className = `card ${highlight ? 'card--highlight' : ''} ${onClick ? 'card--clickable' : ''}`;

  return (
    <article className={className} onClick={onClick}>
      {image && (
        <img
          className="card__image"
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      <header className="card__header">
        <h3 className="card__title">{title}</h3>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </header>

      {stats.length > 0 && (
        <dl className="card__stats">
          {stats.map((stat) => (
            <div className="card__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value ?? '—'}</dd>
            </div>
          ))}
        </dl>
      )}

      {children && <div className="card__body">{children}</div>}
    </article>
  );
}
