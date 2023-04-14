import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
    render() {
        const { data } = this.props;

        const modifiedData = data.map((item) => ({
            name: item.fullName,
            percentage: Math.round((item.acertos / (item.acertos + item.erros + item.restantes)) * 100),
        }));
        console.log(modifiedData) 
        return (
            <div style={{ width: 450, height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={modifiedData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name"
                            tick={{ fontSize: 12 }} // Define o tamanho da fonte dos nomes
                            tickFormatter={(value, index) => (
                                `${value}`
                            )}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Desempenho" dataKey="percentage" stroke="#527DF3B2" fill="#527DF3B2" fillOpacity={0.6} />
                        // can add more if needed
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
