import React from "react";

export function Modal({ children, title, onClose }) {
  return (
    <div className="modal">
      <div className="modal-title">
        <div className="close" onClick={onClose}>X</div>
        {title}
      </div>
      <div className="modal-body">
        {children}
      </div>
    </div>
  )
}
