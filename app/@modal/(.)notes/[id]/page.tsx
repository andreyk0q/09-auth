import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

interface ModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { id } = await params;

  return (
    <Modal>
      <NotePreviewClient id={id} />
    </Modal>
  );
}
