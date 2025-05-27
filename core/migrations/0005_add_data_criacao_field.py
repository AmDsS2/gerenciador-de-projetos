from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_add_criado_por_field'),
    ]

    operations = [
        migrations.AddField(
            model_name='projeto',
            name='data_criacao',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ] 