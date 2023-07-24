module.exports = async function(db, { proffyValue, classValue, classScheduleValue }) {
    //Inserir dados na Tabela teachers
    const insertedProffy = await db.run(`
    INSERT INTO proffys(name,avatar,whatsaap,bio)VALUES("${proffyValue.name}","${proffyValue.avatar}","${proffyValue.whatsaap}","${proffyValue.bio}");
    `);
    const proffy_id = insertedProffy.lastID;
    //Inserir dados na tabela classes
    const insertedClass = await db.run(`
    INSERT INTO classes(subject,cost,proffy_id)VALUES("${classValue.subject}","${classValue.cost}","${proffy_id}");
    `);
    const class_id = insertedClass.lastID;
    //Inserir dados na tabela calss_schedule
    const insertedAllClassSchedule = classScheduleValue.map((value) => {
        return db.run(`
        INSERT INTO class_schedule(class_id,weekday,time_from,time_to)VALUES("${class_id}","${value.weekday}","${value.time_from}","${value.time_to}");
        `);
    });
    //Aqui executar todos os db.run() das class_schedule
    //Executar um por um e aguardar
    await Promise.all(insertedAllClassSchedule);
}