export default interface IRawTags {
    TIT2: string; // Título da música
    TPE1: string; // Artista
    APIC: APIC;   // Capa do álbum
}

interface APIC {
    mime: string; // Tipo MIME da imagem (ex: image/jpeg, image/png)
    type: number; // Tipo da imagem (ex: 3 = capa frontal)
    description?: string; // Descrição da imagem (opcional)
    data: Buffer; // Buffer contendo a imagem
}


