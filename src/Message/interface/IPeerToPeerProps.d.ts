export interface IPeerToPeerProps {
  closeEmit: (close: boolean) => void;
  minimumEmit?: (minimum: boolean) => void;
}
