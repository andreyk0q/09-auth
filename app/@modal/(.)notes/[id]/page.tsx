import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface ModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { id } = await params;

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}
