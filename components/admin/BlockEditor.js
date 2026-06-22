'use client';

// Édite le corps d'un article : tableau de blocs
//   { h }  sous-titre · { p }  paragraphe · { ul: [] }  liste à puces
// Les blocs « enrichis » (paragraphes/listes contenant des liens internes, sous forme de tableaux)
// sont préservés tels quels et affichés en lecture seule, pour ne jamais perdre de contenu.

function isRich(v) {
  return typeof v !== 'string';
}

// Aplati un contenu enrichi (chaîne ou tableau de segments) en texte lisible.
function flatten(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content.map((seg) => (typeof seg === 'string' ? seg : seg?.label || '')).join('');
  }
  if (content && typeof content === 'object') return content.label || '';
  return '';
}

function blockType(b) {
  if ('h' in b) return 'h';
  if ('ul' in b) return 'ul';
  return 'p';
}

export default function BlockEditor({ blocks = [], onChange }) {
  function set(i, value) {
    onChange(blocks.map((b, k) => (k === i ? value : b)));
  }
  function add(type) {
    const block = type === 'h' ? { h: '' } : type === 'ul' ? { ul: [''] } : { p: '' };
    onChange([...blocks, block]);
  }
  function remove(i) {
    onChange(blocks.filter((_, k) => k !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = blocks.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {blocks.map((b, i) => {
        const type = blockType(b);
        return (
          <div className="admin-block" key={i}>
            <div className="admin-block-head">
              <span className="tag">
                {type === 'h' ? 'Sous-titre' : type === 'ul' ? 'Liste' : 'Paragraphe'}
              </span>
              <div className="admin-inline-btns">
                <button type="button" className="btn-admin ghost sm" onClick={() => move(i, -1)}>
                  ↑
                </button>
                <button type="button" className="btn-admin ghost sm" onClick={() => move(i, 1)}>
                  ↓
                </button>
                <button type="button" className="btn-admin danger sm" onClick={() => remove(i)}>
                  Supprimer
                </button>
              </div>
            </div>

            {type === 'h' && (
              <input type="text" value={b.h || ''} onChange={(e) => set(i, { h: e.target.value })} />
            )}

            {type === 'p' &&
              (isRich(b.p) ? (
                <div>
                  <textarea value={flatten(b.p)} readOnly />
                  <small style={{ color: '#6b7785' }}>
                    Contenu enrichi (avec liens) — non modifiable ici pour préserver les liens.
                  </small>
                </div>
              ) : (
                <textarea value={b.p || ''} onChange={(e) => set(i, { p: e.target.value })} />
              ))}

            {type === 'ul' && (
              <div>
                {(b.ul || []).map((li, j) =>
                  isRich(li) ? (
                    <div key={j} style={{ marginBottom: 6 }}>
                      <input type="text" value={flatten(li)} readOnly />
                      <small style={{ color: '#6b7785' }}>Élément enrichi (lien) — non modifiable ici.</small>
                    </div>
                  ) : (
                    <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <input
                        type="text"
                        value={li}
                        onChange={(e) => {
                          const ul = b.ul.map((x, k) => (k === j ? e.target.value : x));
                          set(i, { ul });
                        }}
                      />
                      <button
                        type="button"
                        className="btn-admin danger sm"
                        onClick={() => set(i, { ul: b.ul.filter((_, k) => k !== j) })}
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  className="btn-admin ghost sm"
                  onClick={() => set(i, { ul: [...(b.ul || []), ''] })}
                >
                  + Élément
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="admin-inline-btns" style={{ marginTop: 6 }}>
        <button type="button" className="btn-admin ghost" onClick={() => add('h')}>
          + Sous-titre
        </button>
        <button type="button" className="btn-admin ghost" onClick={() => add('p')}>
          + Paragraphe
        </button>
        <button type="button" className="btn-admin ghost" onClick={() => add('ul')}>
          + Liste
        </button>
      </div>
    </div>
  );
}
