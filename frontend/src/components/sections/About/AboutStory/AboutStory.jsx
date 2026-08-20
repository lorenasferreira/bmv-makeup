import styles from "./AboutStory.module.css";

function AboutStory() {
  return (
    <>
      <section className={styles.manifesto}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <span>Beleza com identidade</span>
        </div>

        <div className={styles.manifestoContent}>
          <p className={styles.manifestoLead}>
            Mais do que
            <br />
            transformar,
            <br />
            revelar.
          </p>

          <div className={styles.manifestoCopy}>
            <p>
              Para Bruno, maquiagem não é sobre esconder ou transformar alguém
              em outra pessoa. É sobre entender quem está diante dele e criar a
              partir daí.
            </p>

            <p>
              Cada rosto, cada ocasião e cada projeto pedem uma abordagem
              diferente — sempre respeitando a personalidade, o estilo e a
              individualidade de cada pessoa.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyImageWrapper}>
          <img
            src="/assets/images/about/bruno-portrait.jpeg"
            alt="Retrato de Bruno Menezes"
            className={styles.storyImage}
          />
        </div>

        <div className={styles.storyContent}>
          <div className={styles.sectionLabel}>
            <span>02</span>
            <span>Do Brasil a Barcelona</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Uma trajetória
            <br />
            construída através
            <br />
            da beleza.
          </h2>

          <div className={styles.storyCopy}>
            <p>
              Com mais de oito anos de experiência no universo da beleza, Bruno
              Menezes construiu uma trajetória marcada pela versatilidade e pela
              atenção aos detalhes.
            </p>

            <p>
              Hoje, em Barcelona, seu trabalho atravessa diferentes contextos —
              de momentos pessoais e celebrações a produções criativas,
              editoriais e profissionais.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachImageWrapper}>
          <img
            src="/assets/images/about/bruno-client.jpeg"
            alt="Bruno Menezes maquiando uma cliente"
            className={styles.approachImage}
          />
        </div>

        <div className={styles.approachContent}>
          <div className={styles.sectionLabel}>
            <span>03</span>
            <span>A abordagem</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Cada trabalho
            <br />
            começa pela pessoa.
          </h2>

          <p className={styles.approachText}>
            Escuta, técnica e sensibilidade para criar um resultado que funcione
            diante do espelho, da câmera ou de uma sala cheia de pessoas — sem
            apagar quem está por trás da maquiagem.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutStory;
