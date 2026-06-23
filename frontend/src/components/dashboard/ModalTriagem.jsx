import React from 'react';
import '../../styles/global.css';

function ModalTriagem({ onClose, onSubmit, formValues, onChange }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Registo de Triagem</h2>
                    <button className="btn-fechar" onClick={onClose}>X</button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label>Matrícula</label>
                        <input
                            type="text"
                            required
                            name="matricula"
                            value={formValues.matricula}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-row dupla">
                        <div className="input-group">
                            <label>Pressão Arterial</label>
                            <input
                                type="text"
                                required
                                name="pressao"
                                value={formValues.pressao}
                                onChange={onChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Temperatura (°C)</label>
                            <input
                                type="number"
                                step="0.1"
                                required
                                name="temperatura"
                                value={formValues.temperatura}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Queixa Principal</label>
                        <textarea
                            rows="3"
                            required
                            name="queixa"
                            value={formValues.queixa}
                            onChange={onChange}
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalTriagem;