from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_add_municipio_field'),
    ]

    operations = [
        migrations.AddField(
            model_name='projeto',
            name='sla',
            field=models.CharField(blank=True, max_length=10, null=True, choices=[
                ('24h', '24 horas'),
                ('48h', '48 horas'),
                ('72h', '72 horas'),
                ('5d', '5 dias'),
                ('10d', '10 dias'),
                ('15d', '15 dias'),
                ('30d', '30 dias'),
            ]),
        ),
    ] 