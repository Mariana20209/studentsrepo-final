import json
import os
import pandas as pd


def exportar_resultados(df: pd.DataFrame, resumen: dict) -> None:
    """Exporta CSV limpio y JSON para el dashboard frontend."""
    os.makedirs("Output", exist_ok=True)
    os.makedirs("Frontend", exist_ok=True)

    # Exportar CSV limpio
    df.to_csv("Output/proyectos_limpios.csv", index=False, encoding="utf-8-sig")

    # Convertir fechas a string para JSON
    resumen_json = json.loads(json.dumps(resumen, default=str))

    # Exportar JSON para el frontend
    with open("Frontend/resumen_studentsrepo.json", "w", encoding="utf-8") as f:
        json.dump(resumen_json, f, ensure_ascii=False, indent=4)

    print("✅ Archivos exportados:")
    print("   - Output/proyectos_limpios.csv")
    print("   - Frontend/resumen_studentsrepo.json")