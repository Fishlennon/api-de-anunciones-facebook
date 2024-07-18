class Ad {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.insights = data.insights || {};
      this.targeting = data.targeting || {};
      this.createdTime = data.created_time;
      this.updatedTime = data.updated_time;
    }
  
    static fromApiResponse(apiData) {
      return new Ad({
        id: apiData.id,
        name: apiData.name,
        insights: apiData.insights ? this.parseInsights(apiData.insights) : {},
        targeting: apiData.targeting || {},
        created_time: apiData.created_time,
        updated_time: apiData.updated_time
      });
    }
  
    static parseInsights(insightsData) {
      // Aquí puedes agregar lógica para parsear y estructurar los datos de insights
      // según tus necesidades específicas
      return {
        impressions: insightsData.impressions,
        clicks: insightsData.clicks,
        spend: insightsData.spend,
        ctr: insightsData.ctr,
        cpc: insightsData.cpc,
        // Agrega más métricas según sea necesario
      };
    }
  
    isPerforming() {
      // Ejemplo de método para determinar si un anuncio está teniendo buen rendimiento
      // Puedes personalizar esta lógica según tus criterios
      const ctr = this.insights.ctr;
      const cpc = this.insights.cpc;
      return (ctr > 1.5 && cpc < 0.5); // Estos son valores de ejemplo
    }
  
    getSegmentationSummary() {
      // Método para obtener un resumen de la segmentación
      return {
        age: this.targeting.age_min + '-' + this.targeting.age_max,
        genders: this.targeting.genders,
        locations: this.targeting.geo_locations,
        interests: this.targeting.interests,
        // Agrega más campos de segmentación según sea necesario
      };
    }
  }
  
  module.exports = Ad;