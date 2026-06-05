import pandas as pd


def analizar_datos(df: pd.DataFrame) -> dict:
    """Genera resúmenes y KPIs para el dashboard."""

    # KPIs generales
    total = len(df)
    aprobados = len(df[df["estado"] == "Aprobado"])
    pendientes = len(df[df["estado"] == "Pendiente"])
    rechazados = len(df[df["estado"] == "Rechazado"])
    tasa_aprobacion = round((aprobados / total) * 100, 1)
    total_estudiantes = df["estudiante"].nunique()

    kpis = {
        "total_proyectos": total,
        "aprobados": aprobados,
        "pendientes": pendientes,
        "rechazados": rechazados,
        "tasa_aprobacion": tasa_aprobacion,
        "total_estudiantes": total_estudiantes,
    }

    # Proyectos por estado
    por_estado = (
        df.groupby("estado", as_index=False)
        .size()
        .rename(columns={"size": "cantidad"})
        .sort_values("cantidad", ascending=False)
    )

    # Proyectos por área
    por_area = (
        df.groupby("area", as_index=False)
        .size()
        .rename(columns={"size": "cantidad"})
        .sort_values("cantidad", ascending=False)
    )

    # Top estudiantes con más proyectos
    top_estudiantes = (
        df.groupby("estudiante", as_index=False)
        .size()
        .rename(columns={"size": "proyectos"})
        .sort_values("proyectos", ascending=False)
        .head(10)
    )

    # Proyectos aprobados por área
    aprobados_por_area = (
        df[df["estado"] == "Aprobado"]
        .groupby("area", as_index=False)
        .size()
        .rename(columns={"size": "aprobados"})
        .sort_values("aprobados", ascending=False)
    )

    # Proyectos por mes
    por_mes = (
        df.groupby("mes_num", as_index=False)
        .size()
        .rename(columns={"size": "cantidad"})
        .sort_values("mes_num")
    )

    print("✅ Análisis generado correctamente.")
    return {
        "kpis": kpis,
        "por_estado": por_estado.to_dict(orient="records"),
        "por_area": por_area.to_dict(orient="records"),
        "top_estudiantes": top_estudiantes.to_dict(orient="records"),
        "aprobados_por_area": aprobados_por_area.to_dict(orient="records"),
        "por_mes": por_mes.to_dict(orient="records"),
        "datos_limpios": df.drop(columns=["mes_num"]).to_dict(orient="records"),
    }