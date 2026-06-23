import '../../styles/global.css';

function ModalFuncionario({ onClose, onSubmit, formValues, onChange }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Cadastrar Funcionário (Paciente)</h2>
                    <button className="btn-fechar" onClick={onClose}>X</button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-row dupla">
                        <div className="input-group">
                            <label htmlFor="matricula">Matrícula</label>
                            <input
                                type="text"
                                required
                                id="matricula"
                                name="matricula"
                                value={formValues.matricula}
                                onChange={onChange}
                                placeholder="Ex: 50442"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                required
                                id="cpf"
                                name="cpf"
                                value={formValues.cpf}
                                onChange={onChange}
                                placeholder="000.000.000-00"
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            required
                            id="nome"
                            name="nome"
                            value={formValues.nome}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-row dupla">
                        <div className="input-group">
                            <label htmlFor="cargo">Cargo</label>
                            <input
                                type="text"
                                required
                                id="cargo"
                                name="cargo"
                                value={formValues.cargo}
                                onChange={onChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="setor">Setor / Departamento</label>
                            <input
                                type="text"
                                required
                                id="setor"
                                name="setor"
                                value={formValues.setor}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-primary">Cadastrar Paciente</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalFuncionario;