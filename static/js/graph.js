queue()
    .defer(d3.json, "data/powerlifting.csv")
    .await(makeGraphs);

function makeGraphs (error, transactionsData){
    var ndx = crossfilter(transactionsData);
    
    var sex_dim = ndx.demension(dc.pluck("sex"));
    
    var total_people_group = sex_dim.group().reduceSum(dc.pluck('sex'));
    
     dc.barChart("#barchart")
                .width(300)
                .height(150)
                .margins({top: 10, right: 50, bottom: 30, left: 50})
                .dimension(sex_dim)
                .group(total_people_group)
                .transitionDuration(500)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .xAxisLabel("")
                .yAxis().ticks(4);
            
            dc.renderAll();
};