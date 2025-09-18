import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCharger } from '../../api/charger'
import style from '../../css/chargers.module.scss'

export default function ChargerForm() {
    const nav = useNavigate()
    const [model, setModel] = useState('')
    const [serie, setSerie] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true); setError(null)
        try {
            await createCharger({ model, serie, imageFile })
            nav('/chargers')
        } catch (e: any) {
            setError(e?.response?.data?.error || 'Error al crear cargador')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={style.formCharger} onSubmit={onSubmit}>
            <h2>Nuevo cargador</h2>
            {error && <div>{error}</div>}
            <label>
                <span>Modelo</span>
                <input value={model} onChange={e => setModel(e.target.value)} required />
            </label>
            <label>
                <span>Serie</span>
                <input value={serie} onChange={e => setSerie(e.target.value)} required />
            </label>
            <label>
                <span>Imagen</span>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} />
            </label>
            <button className={style.save} disabled={loading}>
                <span>{loading ? 'Guardando…' : 'Guardar'}</span>
            </button>
        </form>
    )
}
